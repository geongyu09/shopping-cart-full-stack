import Button from "@components/common/Button";

export default function OrderConfirmButton(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button fullWidth {...props}>
      주문 확인
    </Button>
  );
}
