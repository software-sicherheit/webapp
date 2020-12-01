<template>
  <div id="spinner">
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
  border: 3px solid transparent;
  border-left: 3px solid #478fff;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1 {
  animation: rotate 1s ease infinite;
}

.loading .effect-2 {
  animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
  border: 3px solid transparent;
  border-left: 3px solid #478fff;
  -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
  animation: rotateOpacity 1s ease infinite 0.2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects {
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotateOpacity {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
