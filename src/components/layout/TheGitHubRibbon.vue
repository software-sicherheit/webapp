<template>
  <a
    class="gh-ribbon darkblue right"
    href="https://github.com/software-sicherheit/webapp"
    target="_blank"
    >Checkout on GitHub!</a
  >
</template>

<style lang="scss" scoped>
$color-darkblue: #1089ec;
$color-darkblue-text: #ffffff;
$color-white: #ffffff;
$color-white-text: #000000;

.gh-ribbon {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
  padding: 10px;
  text-decoration: none;
  position: fixed;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1000;
}

.gh-ribbon:after {
  content: '';
  position: relative;
  display: block;
  top: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
}

.gh-ribbon:before {
  content: '';
  position: relative;
  display: block;
  bottom: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
}

.gh-ribbon.white:after {
  content: '';
  position: relative;
  display: block;
  top: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

.gh-ribbon.white:before {
  content: '';
  position: relative;
  display: block;
  bottom: 8px;
  left: 0;
  width: 600px;
  border: 1px dashed rgba(0, 0, 0, 0.4);
}

.gh-ribbon.right {
  top: 15px;
  right: -285px;
  transform: rotate(45deg) translateY(100%);
}

.gh-ribbon.darkblue {
  background-color: $color-darkblue;
  color: $color-darkblue-text;
}

.gh-ribbon.white {
  background-color: $color-white;
  color: $color-white-text;
}
</style>
