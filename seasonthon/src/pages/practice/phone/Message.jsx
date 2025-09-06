import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import img1 from "../../../assets/image1.png";
import img2 from "../../../assets/image2.png";
import img3 from "../../../assets/image3.png";
import img4 from "../../../assets/image4.png";
import gallery from "../../../assets/gallery.png";
import message from "../../../assets/message.png";

// ================= Styled Components =================
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Popup = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 300px;
`;

const PopupTitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  background: ${(props) => (props.isMine ? "#DCF8C6" : "#fff")};
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  padding: 10px;
  border-radius: 8px;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const MessageImage = styled.img`
  width: 150px;
  border-radius: 8px;
  margin-top: 4px;
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: #fff;
  border-top: 1px solid #ddd;
  margin-bottom: 70px;  // 백버튼 공간 확보
`;

const Icon = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  margin: 0 8px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const Gallery = styled.div`
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 10px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const GalleryItem = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.selected ? "#0077ff" : "transparent")};
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  margin: 0 4px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.cancel ? "#ccc" : "#0077ff")};
  color: #fff;
`;

const BackButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #666;
  color: white;
  border: none;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  z-index: 5;
  &:hover {
    background: #444;
  }
`;

// ================= Component =================
export default function Message() {
  const [showPopup, setShowPopup] = useState(true);
  const [messages, setMessages] = useState([
    { sender: "other", text: "사진이 도착했어요." },
    { sender: "me", text: "나도 보낼게" },
  ]);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const imageList = [
    { src: img1, name: "image1" },
    { src: img2, name: "image2" },
    { src: img3, name: "image3" },
    { src: img4, name: "image4" },
  ];

  // 메시지 전송 로직
  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { sender: "me", text: inputText }]);
      setInputText("");
    }

    if (selectedImage) {
      setMessages((prev) => [...prev, { sender: "me", image: selectedImage.src }]);
      setSelectedImage(null);
    }
  };

  // 엔터 키로 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleSend();
    }
  };

  return (
    <Container>
      {/* 미션 팝업 */}
      {showPopup && (
        <Popup>
          <PopupTitle>
            &lt;미션&gt;<br />
            • 내 갤러리에 있는 사진도 보내보세요<br />
            • 친구가 보낸 사진을 저장해보세요!
          </PopupTitle>
          <ButtonGroup>
            <Button onClick={() => setShowPopup(false)}>확인</Button>
            <Button cancel onClick={() => navigate("/practice")}>취소</Button>

          </ButtonGroup>
        </Popup>
      )}

      {/* 채팅 영역 */}
      <ChatArea>
        {messages.map((msg, index) => (
          <MessageBubble key={index} isMine={msg.sender === "me"}>
            {msg.text && <div>{msg.text}</div>}
            {msg.image && <MessageImage src={msg.image} alt="sent" />}
          </MessageBubble>
        ))}
        {selectedImage && (
          <MessageBubble isMine>
            <MessageImage src={selectedImage.src} alt="preview" />
          </MessageBubble>
        )}
      </ChatArea>

      {/* 갤러리 선택 */}
      {galleryOpen && (
        <Gallery>
          <div style={{ marginBottom: "8px" }}>갤러리 선택</div>
          <GalleryGrid>
            {imageList.map((img) => (
              <GalleryItem
                key={img.name}
                src={img.src}
                selected={selectedImage?.name === img.name}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </GalleryGrid>
        </Gallery>
      )}

      {/* 입력창 */}
      <InputBar>
        {/* 갤러리 아이콘 (왼쪽) */}
        <IconButton onClick={() => setGalleryOpen(!galleryOpen)}>
          <img src={gallery} alt="gallery" width="24" height="24" />
        </IconButton>

        <icon>➕</icon>

        {/* 텍스트 입력창 */}
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
        />

        {/* 메시지 전송 아이콘 (오른쪽) */}
        <IconButton onClick={handleSend}>
          <img src={message} alt="send" width="24" height="24" />
        </IconButton>
      </InputBar>

      {/* 항상 표시되는 연습모드 버튼 */}
      <BackButton onClick={() => navigate("/practice")}>
        연습 모드로 돌아가기
      </BackButton>
    </Container>
  );
}

