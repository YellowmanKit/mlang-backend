class Router {

  getAppend(type){
    return(
    type === 'courseIcon'? 'courses/icons/':
    type === 'projectIcon'? 'projects/icons/':
    type === 'cardIcon'? 'cards/icons/':
    type === 'langAudio'? 'langs/audios/':
    type === 'audioComment'? 'cards/audioComments/':
    type === 'profileIcon'? 'profiles/icons/':
    type === 'subjectIcon'? 'subjects/icons/':
    type === 'schoolIcon'? 'schools/icons/':
    type);
  }
}

export default Router;
