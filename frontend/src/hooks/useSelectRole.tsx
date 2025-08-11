export default function useSelectRole() {
    const selectRole = (role: string) => {
        switch(role) {
        case "Artist":
            return "/images/brush.png";
        case "Programmer":
            return "/images/code.png";
        case "Manager":
        case "Any":
        default:
            return "/images/user.png";
        }
    }

    return { selectRole };
}