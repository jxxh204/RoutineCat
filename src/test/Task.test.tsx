import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import App from "../App";

const setup = () => {
  // const textHandler = jest.fn();
  // textHandler.mockReturnValue("면접 공부"); // 해당 텍스트를 무조건 리턴하도록 구현
  // expect(textHandler).toBeCalledWith("면접 공부"); // 검사.

  const utils = render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );

  return { ...utils };
};

describe("Task Input을 입력하기위해 클릭", () => {
  beforeEach(() => {
    setup();
  });
  test("배경색상 변경", async () => {
    const taskBackground = screen.getByTestId("background-color");
    const inputText = screen.getByPlaceholderText(
      "집중이 필요한 일 한가지를 적어주세요."
    );
    expect(taskBackground).toHaveStyle("fill:100%");
    await userEvent.click(inputText);
    expect(taskBackground).toHaveStyle("fill:80%");
    // const submitButton = screen.getByText("입력");

    // userEvent.type(inputText, "면접 공부");
    // expect(inputText).toHaveValue("면접 공부");

    // await userEvent.click(submitButton);

    // //결과
    // expect(inputText).toHaveValue("면접 공부");
    // expect(inputText).toBeDisabled();
    // expect(submitButton).not.toBeVisible();
  });
  test("저장 버튼 생성", async () => {
    const inputText = screen.getByPlaceholderText(
      "집중이 필요한 일 한가지를 적어주세요."
    );
    await userEvent.click(inputText);
    const saveButton = screen.getByRole("button", { name: /저장/ });
    expect(saveButton).toBeDefined();
  });
  test("글자 수 표현, 50글자까지 구현", async () => {});
});

// describe("Task Edit", () => {
//   test("포커스 모드에서만 호버가 가능해야 합니다.", async () => {
//     setup();

//     const inputText =
//       screen.getByPlaceholderText("지금 집중할 일을 적어주세요.");
//     const submitButton = screen.getByText("입력");

//     userEvent.type(inputText, "면접 공부");
//     expect(inputText).toHaveValue("면접 공부");

//     await userEvent.click(submitButton);

//     expect(inputText).toBeDisabled();

//     await userEvent.hover(inputText);
//     // 고치기
//     waitFor(() => {
//       const editButton = screen.getByLabelText(/수정/);
//       expect(editButton).toBeDefined();
//     });
//   });
// });

// describe("Task Delete", () => {
//   const 텍스트입력 = async () => {
//     const inputText =
//       screen.getByPlaceholderText("지금 집중할 일을 적어주세요.");
//     const submitButton = screen.getByText("입력");

//     userEvent.type(inputText, "면접 공부");
//     expect(inputText).toHaveValue("면접 공부");

//     await userEvent.click(submitButton);

//     expect(inputText).toBeDisabled();

//     return { textElement: inputText };

//     //
//   };
//   test("포커스 모드에서만 호버가 가능해야 합니다.", async () => {
//     setup();
//     const { textElement } = await 텍스트입력();
//     await userEvent.hover(textElement);

//     // 고치기
//     waitFor(() => {
//       const deleteButton = screen.getByRole("button", { name: /삭제/ });
//       expect(deleteButton).toBeDefined();
//     });
//   });
//   test("삭제 버튼을 누릅니다. 텍스트는 초기화되고 포커스모드는 false가 됩니다.", async () => {
//     setup();
//     const { textElement } = await 텍스트입력();
//     await userEvent.hover(textElement);

//     waitFor(async () => {
//       // 버튼 확인
//       const deleteButton = screen.getByRole("button", { name: /삭제/ });
//       await userEvent.click(deleteButton);
//       await expect(textElement).toHaveValue("");
//       await expect(textElement).toBeDisabled();
//       const submitButton = screen.getByText("입력");
//       expect(submitButton).toBeDefined();
//     });
//   });
//   test("Task Create", () => {});
// });