export default {

  namespace: 'home',

  state: {
		condition: { status: '10' },
		tableData: {
			list: [],
			totalCount: 0,
			page: 1,
		},
		formData: {}
	},
	effects: {
		*queryWithCondition({ payload }, { put }) {
			yield put({ type: 'save', payload: { condition: payload } })
		},
	},
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};