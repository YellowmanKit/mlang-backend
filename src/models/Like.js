import mongoose from 'mongoose';
import to from'../to';
import Card from './Card';

var ObjectId = mongoose.Schema.Types.ObjectId;
var likeSchema = mongoose.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date
  }
})

var Like = module.exports = mongoose.model('like',likeSchema);

module.exports.card = async (cardId, userId)=>{
  var err, like, card;
  [err, like] = await to(Like.findOne({card: cardId, user: userId}));
  if(!like){
    [err, like] = await to(Like.create({card: cardId, user: userId, createdAt: new Date()}));
  }else{
    [err, like] = await to(Like.findOneAndUpdate({_id: like._id}, { $set: { cancelled: !like.cancelled }}, { new: true }));
  }
  [err, card] = await to(Card.findOneAndUpdate({ _id: cardId },{ $inc: { likeCount: like.cancelled? -1:1 } }, { new: true }));

  return [err, card, like];
}
