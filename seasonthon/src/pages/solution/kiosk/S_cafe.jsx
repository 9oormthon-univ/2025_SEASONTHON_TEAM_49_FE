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
  top: 20%;
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

const Text = styled.ul`
  font-size: 20px;
  color: #555;
  text-align: center;
  margin-top: 50px; 
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  font-size: 20px;
  padding: 20px 30px;
  margin: 10px;
  border-radius: 12px;
  width: 200px;
  cursor: pointer;

  &:hover {
    background: #357ab7;
  }
`;

const ErrorPopup = styled(Popup)`
  background: #ffe5e5;
  border: 2px solid #ff5c5c;
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
  background: ${({ active }) => (active ? "#4a90e2" : "#ccc")};
  color: white;
  cursor: pointer;
`;

const MenuRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MenuCard = styled.div`
  background: white;
  border: 3px solid ${({ highlight }) => (highlight ? "#4caf50" : "#ddd")};
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
    border-color: ${({ highlight }) => (highlight ? "#4caf50" : "#aaa")};
  }
`;

const ConfirmButton = styled(Button)`
  margin-top: 20px;
`;

const ResultBox = styled(Popup)`
  background: #e5ffe5;
  border: 2px solid #4caf50;
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

export default function S_Cafe() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedTab, setSelectedTab] = useState("커피");
  const [selectedMenu, setSelectedMenu] = useState(null);

  // 정답 로직
  const correctSteps = [
    "먹고가기",           // step 0
    "아메리카노",         // step 1
    "샌드위치",           // step 2
    "적립 안 함",         // step 3
    "신용카드"            // step 4
  ];

  const handleClosePopup = () => setShowPopup(false);

  const handleCorrectClick = () => {
    if (step < 4) {
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
            <li>아메리카노 1잔</li>
            <li>샌드위치 1개</li>
            <li>멤버십 없음</li>
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
          {/* STEP BACK BUTTON */}
          {step > 0 && <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>}

          <Title>주문 방식 선택</Title>
          <Button
            onClick={() => isCorrect("먹고가기") ? handleCorrectClick() : handleWrongClick()}
            style={isCorrect("먹고가기") ? { border: "3px solid #4caf50" } : {}}
          >
            먹고가기
          </Button>
          <Button onClick={handleWrongClick}>포장하기</Button>
          <Text>매장에서 먹고 가는지 포장인지를 물어보고 있어요</Text>
          <Text><li>미션에 해당하는 먹고가기 버튼을 눌러주세요</li></Text>
        </>
      )}

      {!showPopup && step === 1 && (
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
                highlight={isCorrect(item)}
                onClick={() => isCorrect(item) ? handleCorrectClick() : handleWrongClick()}
              >
                {item}
              </MenuCard>
            ))}
          </MenuRow>
          <Text>원하는 음료를 물어보고 있어요</Text>
          <Text>미션에 해당하는 아메리카노 버튼을 눌러주세요</Text>           
        </>
      )}

      {!showPopup && step === 2 && (
        <>
          <Title>추가 메뉴 선택</Title>
          <MenuRow>
            {["샌드위치", "케이크", "추가 없음"].map((item) => (
              <MenuCard
                key={item}
                highlight={isCorrect(item)}
                onClick={() => isCorrect(item) ? handleCorrectClick() : handleWrongClick()}
              >
                {item}
              </MenuCard>
            ))}
          </MenuRow>
          <Text>이미 선택한 메뉴 외에 추가적으로 주문할 메뉴가 있는자 물어보고 있어요</Text>
          <Text>미션에는 샌드위치를 추가했으므로 샌드위치 버튼을 눌러주세요</Text>  
        </>
      )}

      {!showPopup && step === 3 && (
        <>
          <Title>멤버십</Title>
          <Button
            onClick={() => isCorrect("적립 안 함") ? handleCorrectClick() : handleWrongClick()}
            style={isCorrect("적립 안 함") ? { border: "3px solid #4caf50" } : {}}
          >
            적립 안 함
          </Button>
          <Button onClick={handleWrongClick}>적립하기</Button>
          <Text>카페에 적립을 원하는 지 물어보고 있어요</Text>
          <Text>미션에는 적립을 하지 않는다고 했으므로 적립 안 함 버튼을 눌러주세요</Text>  
        </>
      )}

      {!showPopup && step === 4 && (
        <>
          <Title>결제 수단 선택</Title>
          {["신용카드", "현금", "간편결제"].map((item) => (
            <Button
              key={item}
              onClick={() => isCorrect(item) ? handleCorrectClick() : handleWrongClick()}
              style={isCorrect(item) ? { border: "3px solid #4caf50" } : {}}
            >
              {item}
            </Button>
          ))}
          <Text>어떤 수단으로 결제할 지 물어보고 있어요</Text>
          <Text>미션에는 신용카드로 결제한다고 했으므로 신용카드 버튼을 눌러주세요</Text>  
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

      {/* 항상 하단에 표시되는 돌아가기 버튼 */}
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
