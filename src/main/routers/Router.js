class Router {

  getAppend(type){
    return(
    type === 'courseIcon'? 'courses/icons/':
    type === 'projectIcon'? 'projects/icons/':
    type === 'cardIcon'? 'cards/icons/':
    type === 'langAudio'? 'langs/audios/':
    type === 'audioComment'? 'cards/audioComments/':
    type);
  }
}

export default Router;