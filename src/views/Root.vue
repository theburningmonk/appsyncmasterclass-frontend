<template>
  <div class="flex w-full h-screen">
    <!-- left side -->
    <div class="flex w-1/2 h-full bg-blue">Left</div>

    <!-- right side -->
    <div class="flex w-1/2 h-full">Right</div>
  </div>
</template>

<script>
export default {
  name: 'Root',
}
</script>

<style>
div {
  border: 1px dashed blue;
  padding: 15px;
}
div.items-center.justify-center {
  background-color: rgba(240, 240, 240, 0.5);
}
</style>