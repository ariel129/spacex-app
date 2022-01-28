import React, { useContext } from "react";
import { ContextUser } from "..";

export const Form: React.FC = () => {
  const { handleSubmit, handleSave, handleModal, register, errors } =
    useContext(ContextUser);

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="form flex items-stretch ">
        <div className="grid justify-center w-full md:space-y-2  mt-3 mb-3">
          <div className="md:flex flex-col w-full text-xs">
            <div className="mb-3 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">
                Name
                <abbr title="required" className="ml-1 text-red-600">
                  *
                </abbr>
              </label>
              <input
                placeholder="Enter name"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                type="text"
                {...register("name", {
                  required: "This field is required!",
                })}
              />
            </div>
            <h5 className="italic text-red-600">{errors?.name?.message}</h5>
            <div className="mt-2 mb-3 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2">
                Rocket
                <abbr title="required" className="ml-1 text-red-600">
                  *
                </abbr>
              </label>
              <input
                placeholder="Enter rocket"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                type="text"
                {...register("rocket", {
                  required: "This field is required!",
                })}
              />
            </div>
            <h5 className="italic text-red-600">{errors?.rocket?.message}</h5>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-100 border-t p-3">
        <button
          onClick={handleModal}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};
