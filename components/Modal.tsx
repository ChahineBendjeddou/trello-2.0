"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FormEvent, Fragment, useRef } from "react";
import TaskTypeRadioGroupe from "./TaskTypeRadioGroupe";

export default function Modal() {
  const imagesPickerRef = useRef<HTMLInputElement>(null);

  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [newTaskInput, setNewTaskInput, newTaskType, image, setImage, addTask] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.newTaskType,
      state.image,
      state.setImage,
      state.addTask,
    ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };
  return (
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog
        onSubmit={handleSubmit}
        onClose={closeModal}
        as="form"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-lg font-medium leading-6 text-gray-900"
                >
                  Add a Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full p-5 border rounded-md outline-none border-x-gray-300"
                    placeholder="Enter a task here..."
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                  />
                </div>
                <TaskTypeRadioGroupe />

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => imagesPickerRef.current?.click()}
                    className="w-full p-5 border rounded-md outline-none border-x-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="inline-block w-6 h-6 mr-2" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      width={200}
                      height={200}
                      alt="The todo related image"
                      className="object-cover w-full mt-2 transition-all duration-150 cursor-not-allowed h-44 filter hover:grayscale"
                      onClick={() => setImage(null)}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagesPickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
