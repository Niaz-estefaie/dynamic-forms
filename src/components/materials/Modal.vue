<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer uk-clearfix">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 500px;
  height: 90vh;
  overflow: auto;
  margin: 0px auto;
  padding: 15px 20px;
  border-radius: 2px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  background: white;
}
.modal-footer {
  margin-top: 15px;
  text-align: right;
  display: flex;
  align-items: center;
}
.modal-enter,
.modal-leave {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave .modal-container {
  transform: scale(1.1);
}
</style>
