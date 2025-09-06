import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled Components
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

const Popup = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-align: center;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 20px 0;
`;

const MissionList = styled.ul`
  text-align: left;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  font-size: 20px;
  padding: 20px 30px;
  margin: 10px;
  border-radius: 12px;
  width: 200px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  background: ${({ active, theme }) => (active ? theme.colors.primary : "#aaa")};
  color: white;
  cursor: pointer;
`;

const MenuRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const MenuCard = styled.div`
  background: white;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ConfirmButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  font-size: 20px;
  padding: 15px 30px;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ResultBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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

// 메뉴 데이터
const menuData = {
  커피: ["아메리카노", "라떼", "카푸치노"],
  티: ["녹차", "홍차", "캐모마일"],
  에이드: ["레몬에이드", "자몽에이드", "청포도에이드"],
  스무디: ["요거트 스무디", "딸기 스무디", "블루베리 스무디", "초코 스무디"]
};

export default function CafePractice() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);

  const [selectedTab, setSelectedTab] = useState("커피"); // 현재 탭
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴

  const handleClosePopup = () => {
    setShowPopup(false);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const end = Date.now();
      calculateScore(end - startTime);
    }
  };

  const handleStepBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateScore = (elapsedMs) => {
    const elapsedSec = Math.floor(elapsedMs / 1000);
    let point = 0;
    if (elapsedSec <= 30) point = 100;
    else if (elapsedSec <= 60) point = 80;
    else if (elapsedSec <= 120) point = 50;
    else point = 20;
    setScore({ elapsedSec, point });
  };

  // 결과 화면
  if (score) {
    return (
      <Container>
        <ResultBox>
          <h2>잘하셨습니다!</h2>
          <p style={{ fontSize: "20px" }}>⏱ 걸린 시간: {score.elapsedSec}초</p>
          <p style={{ fontSize: "20px" }}>⭐ 점수: {score.point}점</p>
          <Button onClick={() => window.location.reload()}>다시하기</Button>
          <Button onClick={() => navigate("/home")}>홈으로</Button>
        </ResultBox>
        <BackButton onClick={() => navigate("/practice")}>
          연습 모드로 돌아가기
        </BackButton>
      </Container>
    );
  }

  return (
    <Container>
      {showPopup && (
        <Popup>
          <Title>오늘의 미션</Title>
          <MissionList>
            <li>먹고가기</li>
            <li>아메리카노 1잔</li>
            <li>샌드위치 1개</li>
            <li>멤버십 없음</li>
            <li>신용카드 결제</li>
          </MissionList>
          <Button onClick={handleClosePopup}>닫기</Button>
        </Popup>
      )}

      {!showPopup && (
        <>
          {/* STEP BACK BUTTON */}
          {step > 0 && <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>}

          {/* STEP 0: 포장/매장 */}
          {step === 0 && (
            <>
              <Title>주문 방식 선택</Title>
              <Button onClick={handleNext}>먹고가기</Button>
              <Button onClick={handleNext}>포장하기</Button>
            </>
          )}

          {/* STEP 1: 메뉴 선택 */}
          {step === 1 && (
            <>
              <Title>메뉴 선택</Title>
              <TabBar>
                {Object.keys(menuData).map((tab) => (
                  <TabButton
                    key={tab}
                    active={selectedTab === tab}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </TabButton>
                ))}
              </TabBar>

              <MenuRow>
                {menuData[selectedTab].map((item) => (
                  <MenuCard
                    key={item}
                    onClick={() => setSelectedMenu(item)}
                    style={{
                      borderColor: selectedMenu === item ? "#4caf50" : "#ddd",
                    }}
                  >
                    {item}
                  </MenuCard>
                ))}
              </MenuRow>

              <ConfirmButton onClick={handleNext}>주문 확인</ConfirmButton>
            </>
          )}

          {/* STEP 2: 추가 메뉴 */}
          {step === 2 && (
            <>
              <Title>추가 메뉴 선택</Title>
              <MenuRow>
                <MenuCard onClick={handleNext}>샌드위치</MenuCard>
                <MenuCard onClick={handleNext}>케이크</MenuCard>
                <MenuCard onClick={handleNext}>추가 없음</MenuCard>
              </MenuRow>
            </>
          )}

          {/* STEP 3: 멤버십 */}
          {step === 3 && (
            <>
              <Title>멤버십</Title>
              <Button onClick={handleNext}>적립 안 함</Button>
              <Button onClick={handleNext}>적립하기</Button>
            </>
          )}

          {/* STEP 4: 결제 */}
          {step === 4 && (
            <>
              <Title>결제 수단 선택</Title>
              <Button onClick={handleNext}>신용카드</Button>
              <Button onClick={handleNext}>현금</Button>
              <Button onClick={handleNext}>간편결제</Button>
            </>
          )}
        </>
      )}

      {/* 항상 하단에 표시되는 돌아가기 버튼 */}
      {!showPopup && (
        <BackButton onClick={() => navigate("/practice")}>
          연습 모드로 돌아가기
        </BackButton>
      )}
    </Container>
  );
}
