import components from '../components/UI/index';

const UIComponents = {
  install(app) {
    components.forEach((component) => {
      app.component(component.name, component);
    })
  }
}

export default UIComponents;