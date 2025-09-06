import { useNavigate } from "react-router-dom";
 
function Kakao() {
  const navigate = useNavigate(); // navigate 훅 선언
  
  return (
    <div style={styles.container}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-4xl font-bold mb-6">카카오톡</h1>
      <p className="text-2xl">여기서 카카오톡으로 문자를 보내보세요!</p>
      </div>

      {/* 홈으로 돌아가는 버튼 */}
      <div style={{ marginTop: "20px" }}>
        <button style={styles.backButton} onClick={() => navigate("/practice")}>
          메뉴로 돌아가기
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
  },
  backButton: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#999",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Kakao;
