import { resetFee, switchUserStatus, updateTime } from "@/lib/database/users"

const processReenter = async (userId: string) => {
  await switchUserStatus(userId, true)
  await updateTime(userId, new Date())
  await resetFee(userId)
}

export { processReenter }