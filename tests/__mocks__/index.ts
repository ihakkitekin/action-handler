export const mockGetWinnerIndex = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {GetWinnerIndex: mockGetWinnerIndex};
});

export default mock;