import moment from "moment";

export default function Message({ own, msg, user, currentchat }) {
  console.log(msg);
  return (
    <div className={own ? "message own" : "message"}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={own ? user?.profilePicture : currentchat?.profilePicture}
          alt='img'
        />
        <p className='messageText'>{msg.message}</p>
      </div>
      <div className='messageBottom'>{moment(msg.createdAt).fromNow()}</div>
    </div>
  );
}
