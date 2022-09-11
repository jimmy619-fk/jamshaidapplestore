export const fetchLineItems = async (sessionId: string) => {
    // sending a param of session id (getreq)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSession?session_id=${sessionId}`
    );

    if (!res.ok) return;

    // will return products from stripe
    const data = await res.json();
    const products = data.session.data;

    return products;
};