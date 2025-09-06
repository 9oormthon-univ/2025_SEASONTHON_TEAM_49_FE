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

const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
`;

const SideTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 15px;
`;

const SideTab = styled.button`
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : "#aaa")};
  color: white;
  cursor: pointer;
`;

const MenuArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const MenuCard = styled.div`
  background: #fdfdfd;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
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

// 음료 전용 카드
const DrinkCard = styled(MenuCard)`
  padding: 100px 50px; 
  font-size: 16px;    // 글자 크기
`;

// 메뉴 데이터
const menuData = {
  메인: ["불고기버거", "치즈버거"],
  사이드: ["감자튀김", "치즈스틱"],
  세트: ["불고기세트", "치즈세트"],
};

const drinkOptions = ["콜라", "제로콜라", "환타", "사이다", "제로사이다"];

export default function RestaurantPractice() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);

  const [selectedTab, setSelectedTab] = useState("메인"); // 카테고리
  const [selectedMenu, setSelectedMenu] = useState(null); // 메뉴
  const [selectedDrink, setSelectedDrink] = useState(null); // 음료

  const handleClosePopup = () => {
    setShowPopup(false);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (step < 3) {
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
          <p style={{ fontSize: "20px" }}> 걸린 시간: {score.elapsedSec}초</p>
          <p style={{ fontSize: "20px" }}> 점수: {score.point}점</p>
          <p style={{ fontSize: "18px" }}>
            주문 내역: {selectedMenu} {selectedDrink && `+ ${selectedDrink}`}
          </p>
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
            <li>불고기버거 세트</li>
            <li>제로콜라 변경</li>
            <li>신용카드 결제</li>
          </MissionList>
          <Button onClick={handleClosePopup}>닫기</Button>
        </Popup>
      )}

      {!showPopup && (
        <>
          {step > 0 && (
            <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>
          )}

          {/* STEP 0: 먹고가기/포장 */}
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
              <Layout>
                <SideTabs>
                  {Object.keys(menuData).map((tab) => (
                    <SideTab
                      key={tab}
                      active={selectedTab === tab}
                      onClick={() => {
                        setSelectedTab(tab);
                        setSelectedMenu(null);
                      }}
                    >
                      {tab}
                    </SideTab>
                  ))}
                </SideTabs>

                <MenuArea>
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
                </MenuArea>
              </Layout>

              <ConfirmButton
                onClick={() => {
                  if (selectedTab === "세트") {
                    setStep(2); // 세트 → 음료 선택 단계로
                  } else {
                    setStep(3); // 단품 → 결제 단계로 바로 이동
                  }
                }}
                disabled={!selectedMenu}
                style={{
                  background: selectedMenu ? "#4caf50" : "#ccc",
                  cursor: selectedMenu ? "pointer" : "not-allowed",
                }}
              >
                주문 확인
              </ConfirmButton>
            </>
          )}

          {/* STEP 2: 음료 선택 */}
          {step === 2 && (
            <>
              <Title>음료 선택</Title>
              <MenuArea>
              {drinkOptions.map((drink) => (
                <DrinkCard
                  key={drink}
                  onClick={() => setSelectedDrink(drink)}
                  style={{
                    borderColor: selectedDrink === drink ? "#4caf50" : "#ddd",
                  }}
                >
                  {drink}
                </DrinkCard>
              ))}
              </MenuArea>
              <ConfirmButton
                onClick={handleNext}
                disabled={!selectedDrink}
                style={{
                  background: selectedDrink ? "#4caf50" : "#ccc",
                  cursor: selectedDrink ? "pointer" : "not-allowed",
                }}
              >
                선택 완료
              </ConfirmButton>
            </>
          )}

          {/* STEP 3: 결제 */}
          {step === 3 && (
            <>
              <Title>결제 수단 선택</Title>
              <Button onClick={handleNext}>신용카드</Button>
              <Button onClick={handleNext}>현금</Button>
              <Button onClick={handleNext}>간편결제</Button>
            </>
          )}
        </>
      )}

      {!showPopup && (
        <BackButton onClick={() => navigate("/practice")}>
          연습 모드로 돌아가기
        </BackButton>
      )}
    </Container>
  );
}
