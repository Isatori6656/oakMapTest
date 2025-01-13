export const getFacebookProfile = async (accessToken: string) => {
  const response = await fetch(
    "https://graph.facebook.com/v21.0/me?fields=id,name,email,picture",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await response.json();
};
