const FETCHING_DATA = 'FETCHING_DATA';const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';
// API
function r(n) {return Math.floor(Math.random()*n);}
var people=()=>{const a=r(100); return [{name:'Nader',age:a},{name:'Amanda',age:a},{name:'Jason',age:a}];};
function getPeople(){return new Promise((resolve,reject)=>{
  const a=r(4); setTimeout(()=>{const p=people(); return a>2?reject(p):resolve(p); },(a+1)*1000);
})}
// Actions
function getData() {return {type:FETCHING_DATA}}
function getDataSuccess(data) {return {type:FETCHING_DATA_SUCCESS,data}}
function getDataFailure() {return {type:FETCHING_DATA_FAILURE}}
function fetchData() {
  return (dispatch) => {dispatch(getData());getPeople().then((data) => {dispatch(getDataSuccess(data))}).catch((err) => {dispatch(getDataFailure());} );}
}
// DataReducer
const initialState = {data:[],dataFetched:false,isFetching:false,error:false}
function dataReducer (state = initialState,action) {
  switch (action.type) {
    case FETCHING_DATA:return {...state,data:[],isFetching:true}
    case FETCHING_DATA_SUCCESS:return {...state,isFetching:false,data:action.data}
    case FETCHING_DATA_FAILURE:return {...state,isFetching:false,error:true}
    default:return state
  }
}
const rootReducer = Redux.combineReducers({dataReducer});
// AppComp
var styles = {container:{marginTop:100},text:{background:'#ffeb3b',margin:10,padding:10,width:200}}
const AppComp = (props) => {
  const {container,text} = styles;
  return (
    <div style={container}>
      <div style={text} onClick={() => props.fetchData()}>{'Load data'}</div>
      <div style={text}>
        {props.dataReducer.data.length ? (
            props.dataReducer.data.map((person,i) => {return <div key={i}><div>Name:{person.name} | Age:{person.age}</div></div>})
          ) :props.dataReducer.isFetching?(<div>Loading</div>):"Empty"
        }
      </div>
    </div>
  );
}
function mapStateToProps (state) {return {dataReducer:state.dataReducer}}
// function mapDispatchToProps (dispatch) {return {fetchData:() => fetchData()(dispatch) }}
function mapDispatchToProps (dispatch) {return {fetchData:() => dispatch(fetchData()) }}
const App = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(AppComp)
// configureStore.js
// function configureStore() {let store = Redux.createStore(rootReducer);return store;}
function configureStore() {let store = Redux.createStore(rootReducer,Redux.applyMiddleware(ReduxThunk.default));return store;}
const store = configureStore(); store.subscribe( ()=>console.log(2,store.getState()) );
const ReduxApp = () => (<ReactRedux.Provider store={store}><App/></ReactRedux.Provider>);
ReactDOM.render(<ReduxApp />,document.getElementById('root'));