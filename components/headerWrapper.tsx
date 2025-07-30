import { checkUser } from "@/lib/checkuser";
import Header from "./header";
export const HeaderWrapper = async () => {
    await checkUser();
    return <Header />;
}
