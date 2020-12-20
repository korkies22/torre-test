// Checks if user exists
export const checkMember = async (username): Promise<any> => {
  const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw {
      message: `${username} does not exist in Torre.co`,
      statusCode: 403,
    }
  }
  return (await response.json()).person
}
