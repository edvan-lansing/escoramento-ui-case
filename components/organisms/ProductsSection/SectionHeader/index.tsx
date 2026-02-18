import Box from "@mui/material/Box";
import Heading from "../../../atoms/Heading";
import Text from "../../../atoms/Text";
import theme from "@/styles/theme";

type SectionHeaderProps = {
	title: string;
	subtitle: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
	return (
		<Box sx={{ 
            display: "grid",
            gap: "10px",
            mt: { xs: "48px", md: "96px" },
            mb: "32px",
            ml : { xs: "16px", md: "24px" },
            mr: { xs: "16px", md: "24px" },
            fontSize: { xs: "28.8px", md: "2.125rem" },
            fontWeight: 700,
            }}>
    		<Heading>{title}</Heading>
			<Text $muted sx={{ fontSize: "19.2px", color: theme.colors.textPrimary }}>{subtitle}</Text>
		</Box>
	);
}
