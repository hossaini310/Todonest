<template>
  <div class="mt-8">
    <div class="text-left mr-3 mb-2 text-mako-200 text-[10px] sm:text-xs">
      Completed Todos: <span class="font-black">{{ store.getCompletedTodos.length }}</span>
    </div>
    <div
      class="flex row items-center justify-between w-full py-1 my-3 rounded text-mako-100"
      v-for="todo of store.getCompletedTodos"
      :key="todo.todo_id"
    >
      <div class="flex">
        <input
          type="checkbox"
          value=""
          class="w-6 h-6 mr-4 opacity-60 bg-mako-300 rounded-[3px] border-mako-600 border-[2px] focus:ring-0 focus:bg-mako-300 focus:ring-offset-0 focus:border-mako-600 focus:text-mako-300 checked:bg-mako-300 checked:border-opacity-100 checked:focus:border-mako-600 checked:hover:bg-mako-300 checked:hover:border-mako-600 checked:border-mako-600 hover:bg-mako-300 cursor-pointer"
          :checked="todo.completed == true"
          v-model="todo.completed"
          @click="store.patchTodoChecked(todo)"
        />
        <div class="flex flex-wrap text-left line-through opacity-80">
          <div class="w-full text-clip text-sm sm:text-base font-bold">
            <span>{{ todo.title }}</span>
          </div>
          <div class="w-full text-clip text-mako-200 text-[10px] sm:text-xs font-bold">
            {{ todo.description }}
          </div>
        </div>
      </div>
      <div class="flex items-center my-auto row-reverse text-right">
        <div class="w-10 mr-3 mb-2 text-mako-200 opacity-80 text-[10px] sm:text-[12px]">
          {{ getFormatDate(todo.updated_at) }}
        </div>
        <Menu as="div" class="relative inline-block">
          <div class="flex">
            <MenuButton class="block">
              <i
                class="fi fi-sr-menu-dots text-mako-200 opacity-70 hover:text-mako-50 hover:text-opacity-60"
              ></i>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="z-10 origin-top-right bg-mako-300 absolute right-0 w-36 rounded-md shadow-lg bg-white border-2 border-mako-600 focus:outline-none"
            >
              <div class="py-1">
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
                      <i class="fi fi-sr-pencil mr-3"></i>
                      Edit
                    </button>
                  </MenuItem>
                </form>
                <form @submit.prevent="store.delTodo(todo)" action="#">
                  <MenuItem v-slot="{ active }" class="text-mako-100">
                    <button
                      :class="[
                        active ? 'rounded-lg hover:text-mako-50' : '',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                    >
                      <i class="fi fi-sr-trash mr-3"></i>
                      Delete
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
