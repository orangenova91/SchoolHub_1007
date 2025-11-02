export const DOTS = '...';

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * 페이지네이션 배열을 생성하는 헬퍼 함수
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지 수
 * @param siblingCount 현재 페이지 양옆에 보여줄 숫자 개수 (기본 1)
 * @returns (string | number)[]
 */
export const usePagination = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (string | number)[] => {

  // 총 보여줄 페이지 숫자 개수 (형제 + 첫/끝 + 현재 + 양쪽 ... = 5 + siblingCount)
  const totalPageNumbers = siblingCount + 5;

  /*
    Case 1:
    전체 페이지 수가 위 개수보다 적으면, 모든 페이지 번호를 보여줌
    (e.g., totalPages = 5 -> [1, 2, 3, 4, 5])
  */
  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  // 좌우 형제 페이지 인덱스 계산
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  // ... (점) 표시 여부 결정
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  /*
    Case 2: 왼쪽 ...은 없고, 오른쪽 ...만 표시
    (e.g., [1, 2, 3, 4, 5, '...', 10])
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPages];
  }

  /*
    Case 3: 오른쪽 ...은 없고, 왼쪽 ...만 표시
    (e.g., [1, '...', 6, 7, 8, 9, 10])
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
    Case 4: 양쪽 ... 모두 표시
    (e.g., [1, '...', 4, 5, 6, '...', 10])
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  // 기본값 (Case 1과 동일)
  return range(1, totalPages);
};