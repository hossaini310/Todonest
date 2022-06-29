<template>
  <div class="mt-8">
    <div class="text-left mb-2 text-mako-200 text-[10px] sm:text-xs">
      Uncompleted Todos: <span class="font-black">{{ store.getUncompletedTodos.length }}</span>
    </div>
    <div
      class="flex row items-center justify-between w-full py-1 my-3 rounded text-mako-50"
      v-for="todo of store.getUncompletedTodos"
      :key="todo.todo_id"
    >
      <div class="flex">
        <input
          type="checkbox"
          class="w-6 h-6 mr-4 bg-mako-300 rounded-[3px] border-mako-600 border-[2px] focus:ring-0 focus:bg-mako-300 focus:ring-offset-0 focus:border-mako-600 focus:text-mako-300 checked:bg-mako-300 checked:border-opacity-100 checked:focus:border-mako-600 checked:hover:bg-mako-300 checked:hover:border-mako-600 checked:border-mako-600 hover:bg-mako-300 cursor-pointer"
          :checked="todo.completed == true"
          v-model="todo.completed"
          @click="store.patchTodoChecked(todo)"
        />
        <div class="flex flex-wrap text-left">
          <div class="w-full text-clip text-sm sm:text-base font-bold">
            <span>{{ todo.title }}</span>
          </div>
          <div class="w-full text-clip text-mako-200 text-[10px] sm:text-xs font-bold">
            {{ todo.description }}
          </div>
        </div>
      </div>

      <div class="flex items-center my-auto row-reverse text-right">
        <div class="w-12 mr-3 text-mako-200 opacity-80 text-[10px] sm:text-[12px]">
          {{ getFormatDate(todo.updated_at) }}
        </div>
        <Menu as="div" class="relative inline-block">
          <MenuButton class="block justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-5 fill-mako-200 hover:fill-mako-50 hover:opacity-60"
            >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
          </MenuButton>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="z-10 origin-top-right bg-mako-300 absolute right-0 mt- w-36 rounded-md shadow-lg bg-white border-2 border-mako-600 focus:outline-none"
            >
              <div class="py-1">
                <div action="#">
                  <form @submit.prevent="store.setModalEditTodo(todo)" action="#">
                    <MenuItem v-slot="{ active }" class="text-mako-100">
                      <button
                        :class="[
                          active ? 'rounded-lg text-mako-50  ' : '',
                          'block w-full text-left px-4 py-2 text-sm',
                        ]"
                        :data-bs-target="`#editTodoModaltodo${todo.todo_id}`"
                        data-bs-toggle="modal"
                      >
                        <div class="flex space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="w-5 fill-mako-100"
                          >
                            <path
                              d="M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z"
                            />
                          </svg>
                          <span>Edit</span>
                        </div>
                      </button>
                    </MenuItem>
                  </form>
                </div>
                <form @submit.prevent="store.delTodo(todo)" action="#">
                  <MenuItem v-slot="{ active }" class="text-mako-100">
                    <button
                      :class="[
                        active ? 'rounded-lg hover:text-mako-50' : '',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                    >
                      <div class="flex space-x-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="w-4 fill-mako-100"
                        >
                          <g id="32843b47-c45c-4436-b212-99015eb713a5" data-name="delete">
                            <path
                              d="M23,2H17V0H7V2H1A1,1,0,0,0,0,3V5A1,1,0,0,0,1,6H23a1,1,0,0,0,1-1V3A1,1,0,0,0,23,2Z"
                            />
                            <path
                              d="M18.28,24H5.82a2,2,0,0,1-2-1.75L2,8H22L20.27,22.25A2,2,0,0,1,18.28,24Z"
                            />
                          </g>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div
          class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          :id="`editTodoModaltodo${todo.todo_id}`"
          :aria-labelledby="`editTodoModal${todo.todo_id}`"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div
              class="modal-content shadow-lg relative flex flex-col w-screen pointer-events-auto rounded-lg text-current bg-mako-400 border-2 border-mako-600"
            >
              <div
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b-2 border-mako-600 rounded-t-lg"
              >
                <h5 class="text-xl font-bold leading-normal text-mako-50">Edit your Todo</h5>
                <button
                  type="button"
                  class="box-content w-4 h-4 p-1 text-mako-100 hover:text-mako-50"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="store.clearModalEditTodo()"
                >
                  <i class="fi fi-sr-cross"></i>
                </button>
              </div>
              <div
                class="modal-body relative p-8 text-mako-50 max-w-full mx-auto flex items-center"
              >
                <form
                  action="#"
                  class="w-full sm:w-[500px] px-4 mx-auto flex flex-col rounded-md"
                  @submit.prevent="store.patchTodo"
                >
                  <label class="text-left text-sm ml-1 text-mako-200"
                    >Todo Title (Max length: 100 char.)</label
                  >
                  <input
                    maxlength="70"
                    type="text"
                    class="px-3 py-2.5 mb-3 border-2 bg-mako-300 border-mako-600 rounded-md focus:border-mako-600 focus:ring-0"
                    v-model="store.getModalEditTodo.title"
                  />
                  <label class="text-left text-sm ml-1 text-mako-200"
                    >Todo Description (Max length: 200 char.)</label
                  >
                  <textarea
                    maxlength="90"
                    type="text"
                    class="px-3 py-2.5 mb-2 border-2 bg-mako-300 border-mako-600 rounded-md focus:border-mako-600 focus:ring-0"
                    v-model="store.getModalEditTodo.description"
                  />
                  <div class="text-left flex row items-center w-full py-1">
                    <input
                      type="checkbox"
                      value=""
                      class="w-6 h-6 bg-mako-300 rounded-[3px] border-mako-600 border-[2px] focus:ring-0 backgroundColor focus:bg-mako-300 focus:ring-offset-0 focus:border-mako-600 focus:text-mako-300 checked:bg-mako-300 checked:border-opacity-100 checked:focus:border-mako-600 checked:hover:bg-mako-300 checked:hover:border-mako-600 checked:border-mako-600 hover:bg-mako-300 cursor-pointer"
                      :checked="store.getModalEditTodo.completed == true"
                      v-model="store.getModalEditTodo.completed"
                    />
                    <span class="ml-3 text-mako-100">Mark todo as done</span>
                  </div>
                  <div
                    class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end pt-4 rounded-b-md"
                  >
                    <button
                      data-bs-dismiss="modal"
                      class="inline-block px-6 py-2.5 bg-highlight text-mako-50 font-bold text-xs leading-tight uppercase rounded hover:shadow-lg hover:bg-opacity-90"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-b-[1px] border-mako-500 border-opacity-70" />
  </div>
</template>
<script setup>
import { useTodonestStore } from '@/stores/todonestStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
const store = useTodonestStore();

const getFormatDate = (createdDate) => {
  const date = new Date(createdDate);
  const options = {
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('at-AT', options);
};
</script>
