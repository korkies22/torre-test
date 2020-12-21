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

export const searchOpportunities = async (
  username: string,
  page: number,
  size: number,
  role: string | null
): Promise<any[]> => {
  let roleData = {}
  if (role) {
    roleData = {
      ...roleData,
      'skill/role': {
        text: role,
        experience: 'potential-to-develop',
      },
    }
  }
  const response = await fetch(
    `https://search.torre.co/opportunities/_search/?&lang=en&size=${size}&aggregate=false&offset=${
      page * size
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        and: [roleData],
      }),
    }
  )
  if (!response.ok) {
    throw {
      message: `Unable to fetch your opportunities. Try again later`,
    }
  }
  return (await response.json()).results
}

export const searchOpportunity = async (id: string): Promise<any[]> => {
  const response = await fetch(`https://torre.co/api/opportunities/${id}`)
  if (!response.ok) {
    throw {
      message: `Unable to fetch the opportunity. Try again later`,
    }
  }
  return response.json()
}
