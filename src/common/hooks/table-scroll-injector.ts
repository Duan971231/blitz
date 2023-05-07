import { onMounted, ref } from 'vue';

export default function (hasPagination: boolean) {
  const tableContainer = ref();
  const initialScroll = ref<{ x: number | string; y: number | string }>({ x: 500, y: 500 });
  function updateScroll() {
    const tableHeader = tableContainer.value.querySelector('.ant-table-thead');
    // header可变，需要将header的top加上header高度
    const tableHeaderTop = tableHeader.getBoundingClientRect().top;
    const tableHeaderTopHeight = tableHeader.getBoundingClientRect().height;
    const scrollStart = tableHeaderTop + tableHeaderTopHeight + (hasPagination ? 84 : 30) + 20;
    return { x: 500, y: `calc(100vh  - ${scrollStart}px)` };
  }
  onMounted(() => {
    initialScroll.value = updateScroll();
  });
  return {
    tableContainer,
    initialScroll,
  };
}
