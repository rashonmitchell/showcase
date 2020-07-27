<template>
<div :class="{ loader: true, fadeout: !isLoading }">
  <div class="text-center">
    <h1>yogurt</h1>
    <p>redefine yourself</p>
  </div>
</div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"]
};
</script>

<style lang="scss">
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  p {
    direction: rtl;
    font-size: 15px;
    font-weight: 400;
    //margin-top: -30px;
    text-align: start;
  }
}

.loader {
  background-color: #63ab97;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.fadeout {
  animation: fadeout 1.5s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
