import "./message.css";

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
          alt=""
        />
        <div className="messageText">
          <div>
            Hey how are you!
          </div>
        </div>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
