import FormItemComponents from './components/form-item-components-manager';
export default {
	version: '1.0.0',
	name: 'WbfcVsTpsEditor',
	install(Vue, options) {
		let opt = Object.assign({}, options);
		Vue.use(FormItemComponents, opt);
	}
}