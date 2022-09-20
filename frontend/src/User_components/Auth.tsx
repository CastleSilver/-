import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Auth() {
  // 카카오 개발자 앱 키 선언
  const REST_API_KEY = "4451e1614fc6653da21821b099437e5a";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = "vCiFAO1F3QiMUYfXmR1pddgTcLYFkMFN";
  // 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  // 로그인 성공시 MyPage로 이동시키기위해 userNavigate 사용
  // const navigate = useNavigate();
  useEffect(() => {
    // ///////////////////////////////////////////////////////////////////
    //             백엔드로부터 인가코드 넘기고 jwt 토큰 받기
    // ///////////////////////////////////////////////////////////////////
    async () => {
      try {
        const res = await axios
          // 백엔드 주소 뒤에 인가코드 붙여서 GET 설정
          // 백엔드는 이 주소를 통해 뒤에 붙어져있는 인가코드를 전달 받게 된다.
          .get(`http://localhost:8080/api/oauth/token?code=${code}`)
          // 백엔드 쪽에서 보내준 응답 확인
          .then((response) => {
            console.log("응답 확인", response);
            // 이때, 백엔드로부터 받아온 헤더값에 저장되어있는 authorization을 접근해 token이라는 변수에 저장
            const token = response.headers.authorization;
            // 이 토큰은 프론트엔드, 즉 현재 내 서버에 저장시킨다.
            window.localStorage.setItem("token", token);
          });
        console.log(res);
      } catch (e) {
        // 에러 발생 시, 에러 응답 출력
        console.error(e);
      }

      // 위에서 setItem을 사용하여 내부에 저장시킨 토큰을 다시 불러온다.
      // 이때, 내부 저장소에서 가져온 토큰을 다시 token 이라는 변수에 담는다.
      const token = window.localStorage.getItem("token");
      // ///////////////////////////////////////////////////////////////////
      //             백엔드로 토큰 다시 넘기기
      // ///////////////////////////////////////////////////////////////////
    };
  });
  return null;
}
export default Auth;
