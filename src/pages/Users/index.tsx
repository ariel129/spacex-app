import React, { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER, USER_LISTS } from "../../graphql";
import { Form } from "./components";

interface Props {}

export const ContextUser = createContext<any>(null);

export const Users: React.FC<Props> = () => {
  // STATES
  const [modal, setModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // QUERY | MUTATION
  const { data, loading, error, refetch } = useQuery(USER_LISTS, {
    variables: {
      limit: 10,
    },
  });
  const [Insert_Users] = useMutation(ADD_USER);

  // HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // HANDLE FUNCTION
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleSave = async (data: any) => {
    const response: any = await Insert_Users({ variables: data }).then(
      (data) => {
        refetch();
        return data;
      }
    );

    if (response?.data.insert_users.returning[0].id) {
      setIsSuccess(true);
      handleModal();
      reset();
    }
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Users</h2>
            </header>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  handleModal();
                }}
                className="bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
              >
                Add
              </button>
            </div>
            {isSuccess === true && (
              <div className="italic pl-5 text-red-600">
                You've successfully added!
              </div>
            )}
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">NAME</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">ROCKET</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">DATE</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading === true && (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    )}
                    {error && (
                      <tr>
                        <td>There's an error on API</td>
                      </tr>
                    )}
                    {loading === false &&
                      data.users.length > 0 &&
                      data.users.map((item: any) => (
                        <tr key={item.id}>
                          <td className="p-2 whitespace-nowrap uppercase">
                            {item.name}
                          </td>
                          <td className="p-2 whitespace-nowrap uppercase text-center">
                            {item.rocket}
                          </td>
                          <td className="p-2 whitespace-nowrap text-right">
                            <>{moment(item.timestamp).format("LLL")}</>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContextUser.Provider
        value={{ handleSubmit, handleSave, handleModal, register, errors }}
      >
        <div
          className={`${
            modal === true ? "flex" : "hidden"
          } modal h-screen w-full fixed left-0 top-0 justify-center items-center bg-black bg-opacity-50`}
        >
          <div className="bg-white rounded shadow-lg w-10/12 md:w-1/6">
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Add User</h3>
              <button className="text-black close-modal">
                <svg
                  className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                  onClick={handleModal}
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </button>
            </div>
            <Form />
          </div>
        </div>
      </ContextUser.Provider>
    </>
  );
};
