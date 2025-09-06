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
  border: 2px solid ${({ highlight, theme }) => highlight ? theme.colors.primary : "#ddd"};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SideBar = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const SideButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: ${({ active, theme }) => (active ? theme.colors.primary : "#ccc")};
  color: white;
  cursor: pointer;
`;

const MenuRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const ErrorPopup = styled.div`
  position: fixed;
  top: 10%;
  background: #ffdddd;
  padding: 20px 30px;
  border: 2px solid #ff4444;
  border-radius: 12px;
  font-size: 18px;
  color: #b00020;
  z-index: 100;
`;

const Text = styled.div`
  font-size: 16px;
  color: #444;
  margin-top: 10px;
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

export default function S_Restaurant() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(0);
 
  const [selectedTab, setSelectedTab] = useState("메인"); // 카테고리
  const [selectedMenu, setSelectedMenu] = useState(null); // 메뉴
  const [selectedDrink, setSelectedDrink] = useState(null); // 음료

  const correctSteps = [
    "먹고가기",         // step 0
    "불고기세트",       // step 1
    "제로콜라",         // step 2
    "신용카드"          // step 3
  ];

  const handleClosePopup = () => setShowPopup(false);

  const handleCorrectClick = () => {
    if (step < correctSteps.length - 1) {
      setStep(step + 1);
    } else {
      setStep("done");
    }
  };

  const handleWrongClick = () => {
    setError(true);
    setTimeout(() => setError(false), 2000);
  };

  const isCorrect = (value) => correctSteps[step] === value;

  return (
    <Container>
      {showPopup && (
        <Popup>
          <Title>미션 설명서</Title>
          <MissionList>
            <li>먹고가기</li>
            <li>불고기버거 세트</li>
            <li>제로콜라 변경</li>
            <li>신용카드 결제</li>
          </MissionList>
          <Button onClick={handleClosePopup}>시작하기</Button>
        </Popup>
      )}

      {error && (
        <ErrorPopup>
          <p>❌ 틀렸습니다. 다시 시도해보세요!</p>
        </ErrorPopup>
      )}

      {!showPopup && step === 0 && (
        <>
          <Title>주문 방식 선택</Title>
          <Button onClick={() => isCorrect("먹고가기") ? handleCorrectClick() : handleWrongClick()}>먹고가기</Button>
          <Button onClick={handleWrongClick}>포장하기</Button>
          <Text><li>미션에 해당하는 먹고가기 버튼을 눌러주세요</li></Text>
        </>
      )}

      {!showPopup && step === 1 && (
        <>
          <Title>메뉴 선택</Title>
          <SideBar>
            {Object.keys(menuData).map((tab) => (
              <SideButton
                key={tab}
                active={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </SideButton>
            ))}
          </SideBar>
          <MenuRow>
            {menuData[selectedTab].map((item) => (
              <MenuCard
                key={item}
                highlight={isCorrect(item)}
                onClick={() => isCorrect(item) ? handleCorrectClick() : handleWrongClick()}
              >
                {item}
              </MenuCard>
            ))}
          </MenuRow>
          <Text><li>세트 메뉴에서 불고기세트를 선택해주세요</li></Text>
        </>
      )}

      {!showPopup && step === 2 && (
        <>
          <Title>음료 선택</Title>
          <MenuRow>
            {["콜라", "제로콜라", "사이다", "환타"].map((drink) => (
              <MenuCard
                key={drink}
                highlight={isCorrect(drink)}
                onClick={() => isCorrect(drink) ? handleCorrectClick() : handleWrongClick()}
              >
                {drink}
              </MenuCard>
            ))}
          </MenuRow>
          <Text><li>음료는 제로콜라로 변경해주세요</li></Text>
        </>
      )}

      {!showPopup && step === 3 && (
        <>
          <Title>결제 수단 선택</Title>
          {["신용카드", "현금", "간편결제"].map((method) => (
            <Button
              key={method}
              onClick={() => isCorrect(method) ? handleCorrectClick() : handleWrongClick()}
              style={isCorrect(method) ? { border: "3px solid #4caf50" } : {}}
            >
              {method}
            </Button>
          ))}
          <Text><li>신용카드로 결제해주세요</li></Text>
        </>
      )}

      {/* 정답을 모두 완료한 경우 */}
      {step === "done" && (
        <ResultBox>
          <h2>정답입니다!</h2>
          <p>설명서를 잘 따라오셨어요.</p>
          <Button onClick={() => navigate("/solution")}>설명서 홈으로</Button>
        </ResultBox>
      )}

      {/* 공통 하단 버튼 */}
      {step > 0 && !showPopup && (
        <BackButton onClick={() => navigate("/solution")}>
          설명서 홈으로 돌아가기
        </BackButton>
      )}      

      {step > 0 && step !== "done" && (
        <StepBackButton onClick={() => setStep(step - 1)}>이전 단계</StepBackButton>
      )}
    </Container>
  );
}
