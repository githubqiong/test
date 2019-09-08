export default {

  namespace: 'list',

  state: {
		condition: { status: '10' },
		tableData: {
			list: [],
			totalCount: 0,
			page: 1,
		},
		formData: {}
	},

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};