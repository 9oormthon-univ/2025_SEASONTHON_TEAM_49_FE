import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Popup = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const InputDisplay = styled.div`
  width: 200px;
  padding: 15px;
  font-size: 22px;
  margin: 15px 0;
  border-radius: 8px;
  border: 2px solid #ccc;
  text-align: center;
  background: #fff;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 12px;
  margin: 20px 0;
`;

const KeyButton = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  font-size: 20px;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #005fcc;
  }
`;

const Button = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  font-size: 18px;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background: #005fcc;
  }
`;

const Card = styled.div`
  background: white;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  width: 260px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: #0077ff;
  }
`;

const ResultBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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

// ================= 데이터 =================
const carData = [
  { number: "80나8751", time: "18:00", fee: 4000 },
  { number: "81가8751", time: "17:00", fee: 6000 },
  { number: "82다8751", time: "16:30", fee: 5500 },
];

// ================= 컴포넌트 =================
export default function Parking() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 현재 단계
  const [inputNum, setInputNum] = useState(""); // 입력된 번호
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 차량
  const [selectedCar, setSelectedCar] = useState(null); // 선택된 차량
  const [done, setDone] = useState(false); // 정산 완료 여부

  // 점수 관련
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(null);

  // 키패드 입력
  const handleKeyPress = (val) => {
    if (val === "del") {
      setInputNum(inputNum.slice(0, -1));
    } else if (inputNum.length < 4) {
      setInputNum(inputNum + val);
    }
  };

  // 차량 검색
  const handleSearch = () => {
    const result = carData.filter((car) => car.number.endsWith(inputNum));
    setSearchResult(result);
    setStep(1);
  };

  // 차량 선택
  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  // 결제하기 + 점수 계산
  const handlePay = () => {
    setDone(true);
    const end = Date.now();
    calculateScore(end - startTime);
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

  const handleStepBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Container>
      {/* Step 0: 미션 팝업 */}
      {step === 0 && (
        <Popup>
          <Title>오늘의 미션</Title>
          <p>80나8751 차량</p>
          <p>할인수단: 없음</p>
          <p>결제 방식: 현금</p>
          <Button
            onClick={() => {
              setStep("search");
              setStartTime(Date.now()); // 시작 시간 기록
            }}
          >
            확인
          </Button>
        </Popup>
      )}

      {/* Step "search": 차량 검색 */}
      {step === "search" && (
        <>
          <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>
          <Title>주차 요금 정산기</Title>
          <p>차량 번호 뒤 4자리를 입력하세요</p>
          <InputDisplay>{inputNum || "----"}</InputDisplay>
          <Keypad>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "del", 0].map((key) => (
              <KeyButton key={key} onClick={() => handleKeyPress(key)}>
                {key === "del" ? "⌫" : key}
              </KeyButton>
            ))}
          </Keypad>
          <Button onClick={handleSearch}>확인</Button>
        </>
      )}

      {/* Step 1: 검색 결과 출력 */}
      {step === 1 && (
        <>
          <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>
          <Title>조회된 차량</Title>
          {searchResult.map((car) => (
            <Card key={car.number} onClick={() => handleSelectCar(car)}>
              {car.number}
            </Card>
          ))}
          <Button onClick={() => setStep(2)}>확인</Button>
        </>
      )}

      {/* Step 2: 차량 상세 */}
      {step === 2 && selectedCar && (
        <>
          <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>
          <Title>{selectedCar.number}</Title>
          <p>입차 시간: {selectedCar.time}</p>
          <p>주차 요금: {selectedCar.fee.toLocaleString()}원</p>
          <Button onClick={handlePay}>결제</Button>
        </>
      )}

      {/* Step 3: 결제 완료 + 점수 */}
      {done && score && (
        <ResultBox>
          <h2>정산 완료!</h2>
          <p>차량 {selectedCar.number}</p>
          <p>결제 금액: {selectedCar.fee.toLocaleString()}원</p>
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            잘하셨습니다! 🎉
          </p>
          <p style={{ fontSize: "18px" }}>⏱ 걸린 시간: {score.elapsedSec}초</p>
          <h3>⭐ 점수 : {score.point}점</h3>
          <Button onClick={() => window.location.reload()}>다시하기</Button>
          <Button onClick={() => navigate("/home")}>홈으로</Button>
        </ResultBox>
      )}

      {/* 항상 표시되는 뒤로가기 버튼 */}
      <BackButton onClick={() => navigate("/practice")}>
        연습 모드로 돌아가기
      </BackButton>
    </Container>
  );
}
