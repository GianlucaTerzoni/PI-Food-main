import {
  CLEAN_DIETS,
  CLEAN_RECIPE,
  FILTER_A_Z,
  FILTER_BY_NAME,
  FILTER_DB,
  FILTER_DIET,
  FILTER_SCORE,
  GET_DETAIL,
  GET_DIETS,
  GET_RECIPE,
  POST_RECIPE,
  CLEAN_DETAIL,
  CLEAN_DISH,
} from "../actions/index";

const initialState = {
  recipes: [],
  allrecipes: [],
  diets: [],
  details: [],
  dishtypes: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        allrecipes: action.payload,
      };
      case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
    case FILTER_DIET:
      let copyDiet = [...state.allrecipes];
      let typeDiet =
        action.payload === "all"
          ? copyDiet
          : copyDiet.filter((e) =>
              e.diets.some((e) => e.name === action.payload)
            );
      if (typeDiet.length <= 0) {
        typeDiet = copyDiet;
        alert("There are no recipes for this type of diet");
      }
      return {
        ...state,
        recipes: typeDiet,
      };
      case FILTER_A_Z: 
        let copyAZ = [...state.allrecipes]
        let filterAZ = action.payload === "A-Z" ? copyAZ.sort((a,b) => {
            if (a.name > b.name){
                return 1
            }
            return 0
        })
        : copyAZ.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (b.name > a.name) {
                return 1;
            }
            return 0;
        });
            return {
            ...state,
            recipes: action.payload === 'all' ? state.allrecipes : filterAZ,
            };
        case FILTER_SCORE: 
            let copyScore = [...state.allrecipes]
            let filterScore = action.payload === 'min' ? copyScore.sort((a,b) => {
                if (a.health_score > b.health_score){
                    return 1
                }
                if (b.health_score > a.health_score){
                    return -1
                }
                return 0

            })  
            : copyScore.sort((a,b) => {
                if (a.health_score > b.health_score){
                    return -1
                }
                if (b.health_score > a.health_score){
                    return 1
                }
                return 0

            })
        return {
            ...state,
            recipes: action.payload === 'all' ? state.allrecipes : filterScore
        }

        case FILTER_DB:
            let copy = state.allrecipes;
            let created;
            if (action.payload === 'created') {
                created = copy.filter((e) => e.createdInBd);
            }
            if (action.payload === 'api') {
                created = copy.filter((e) => !e.createdInBd);
            }

            return {
                ...state,
                recipes: action.payload === 'all' ? state.allrecipes : created,
            };
        case FILTER_BY_NAME: 
                return {
                    ...state,
                    recipes: action.payload
                }
        case GET_DETAIL: 
                return {
                    ...state,
                    details: action.payload
                }        
                
        case CLEAN_RECIPE: 
                return {
                    ...state,
                    recipes: action.payload
                }
        case CLEAN_DIETS: 
                return {
                    ...state,
                    diets: action.payload
                }
        case CLEAN_DETAIL: 
                return {
                    ...state,
                    details: action.payload
                }
        case POST_RECIPE: {
            return {
                ...state
            }
        }              

    
            
    default:
      return { ...state };
  }
}
