<script>
export default {
  name: 'App'
};
</script>

<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-container">
        <div class="nav-logo">
          <router-link to="/">Главная</router-link>
        </div>
        <div class="nav-user">
          <span class="user-name">Администратор</span>
        </div>
      </div>
    </nav>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.nav {
  background-color: white;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo a {
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: none;
  color: #333;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #000;
}

.user-name {
  font-size: 0.95rem;
  color: #666;
}

.main {
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 64px;
}
</style>