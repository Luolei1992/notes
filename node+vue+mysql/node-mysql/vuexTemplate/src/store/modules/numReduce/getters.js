const getters = {
  filterRNum : (state,getters)=>{
    return state.numReduce < 0
  }
}

export default getters;