import React from "react";
import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { useQuery } from "@tanstack/react-query";

const RightPanelCommon = () => {

  const { data: suggestedUser, isLoading } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggestedUser");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data
      } catch (error) {
        throw new Error(error);
        
      }
    }
  })

  if (suggestedUser?.length === 0) return <div>
    <p className="md:w-64 w-0 text-center text-slate-500">No users found</p>
  </div>
  return (
    <div className="hidden lg:block my-4 mx-2 ">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">who to follow</p>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
           suggestedUser?.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm">
                    follow
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanelCommon;
