const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) {
    return true
  }
  return false
}

export default checkPermission
