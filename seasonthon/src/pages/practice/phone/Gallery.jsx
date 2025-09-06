import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ================= 이미지 import =================
import img1 from "../../../assets/image1.png";
import img2 from "../../../assets/image2.png";
import img3 from "../../../assets/image3.png";
import img4 from "../../../assets/image4.png";

// ================= Styled Components =================
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background: #f4f4f4;
  padding: 20px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 140px);
  gap: 12px;
`;

const ImageCard = styled.div`
  width: 140px;
  height: 140px;
  border: 2px solid ${(props) => (props.selected ? "#0077ff" : "#ccc")};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Button = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background: #005fcc;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const StepBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #999;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #777;
  }
`;

const BackButton = styled.button`
  position: fixed;
  bottom: 20px;
  background: #666;
  color: white;
  border: none;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background: #444;
  }
`;

// ================= 컴포넌트 =================
export default function Gallery() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: 갤러리, 1: 복구

  const [images, setImages] = useState([
    { src: img1, name: "image1.png" },
    { src: img2, name: "image2.png" },
    { src: img3, name: "image3.png" },
    { src: img4, name: "image4.png" },
  ]);

  const [deletedImages, setDeletedImages] = useState([]);
  const [popup, setPopup] = useState(null); // "deleted", "restored"
  const [selectedRecover, setSelectedRecover] = useState([]);

  // 사진 삭제
  const handleDelete = (imgObj) => {
    setImages(images.filter((i) => i.name !== imgObj.name));
    setDeletedImages([...deletedImages, imgObj]);
    setPopup("deleted");
  };

  // 복구 모드에서 사진 선택/해제
  const toggleSelect = (imgObj) => {
    if (selectedRecover.find((i) => i.name === imgObj.name)) {
      setSelectedRecover(selectedRecover.filter((i) => i.name !== imgObj.name));
    } else {
      setSelectedRecover([...selectedRecover, imgObj]);
    }
  };

  // 선택한 사진 복구
  const handleRecover = () => {
    setImages([...images, ...selectedRecover]);
    setDeletedImages(
      deletedImages.filter(
        (img) => !selectedRecover.find((sel) => sel.name === img.name)
      )
    );
    setSelectedRecover([]);
    setPopup("restored");
    setStep(0); // 복구 후 갤러리로 이동
  };

  return (
    <Container>
      {/* STEP 0: 갤러리 화면 */}
      {step === 0 && (
        <>
          <Title>전체 사진</Title>
          <GalleryGrid>
            {images.map((imgObj) => (
              <ImageCard key={imgObj.name} onClick={() => handleDelete(imgObj)}>
                <img src={imgObj.src} alt={imgObj.name} />
              </ImageCard>
            ))}
          </GalleryGrid>
          <Button onClick={() => setStep(1)}>사진 복구</Button>
        </>
      )}

      {/* STEP 1: 복구 화면 */}
      {step === 1 && (
        <>
          <StepBackButton onClick={() => setStep(0)}>뒤로</StepBackButton>
          <Title>사진 복구 선택</Title>
          {deletedImages.length > 0 ? (
            <>
              <GalleryGrid>
                {deletedImages.map((imgObj) => (
                  <ImageCard
                    key={imgObj.name}
                    selected={selectedRecover.find((i) => i.name === imgObj.name)}
                    onClick={() => toggleSelect(imgObj)}
                  >
                    <img src={imgObj.src} alt={imgObj.name} />
                  </ImageCard>
                ))}
              </GalleryGrid>
              <Button onClick={handleRecover}>선택한 사진 복구</Button>
            </>
          ) : (
            <p>복구할 사진이 없습니다.</p>
          )}
        </>
      )}

      {/* 팝업 */}
      {popup === "deleted" && (
        <Popup>
          <p>삭제되었습니다.</p>
          <Button onClick={() => setPopup(null)}>확인</Button>
        </Popup>
      )}
      {popup === "restored" && (
        <Popup>
          <p>사진이 복구되었습니다.</p>
          <Button onClick={() => setPopup(null)}>확인</Button>
        </Popup>
      )}

      {/* 항상 표시되는 연습모드 버튼 */}
      <BackButton onClick={() => navigate("/practice")}>
        연습 모드로 돌아가기
      </BackButton>
    </Container>
  );
}
