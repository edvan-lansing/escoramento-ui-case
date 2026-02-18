"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocale, useTranslations } from "next-intl";

import Button from "../../../atoms/Button";
import theme from "../../../../styles/theme";
import { MessageIcon, PersonIcon, ShoppingCartIcon } from "../../../atoms/Icon";
import type { NavItem } from "./navItems";

type MobileDrawerProps = {
	navItems: NavItem[];
	open: boolean;
	onClose: () => void;
};

export default function MobileDrawer({ navItems, open, onClose }: MobileDrawerProps) {
	const t = useTranslations("MobileMenu");
	const locale = useLocale();
	const baseUrl = `https://escoramento.com/${locale}`;

	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<Box sx={{ width: 320, p: "18px" }} role="presentation">
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Typography sx={{ fontWeight: 900 }}>{t("title")}</Typography>
					<IconButton aria-label={t("close")} onClick={onClose}>
						<MenuIcon sx={{ transform: "rotate(90deg)" }} />
					</IconButton>
				</Box>

				<Divider sx={{ my: "14px" }} />

				<List sx={{ p: 0 }}>
					{navItems.flatMap((nav) => [
						<Typography
							key={`${nav.label}-title`}
							sx={{
								px: "8px",
								pt: "8px",
								pb: "4px",
								fontWeight: 900,
								color: theme.colors.textPrimary,
							}}
						>
							{nav.label}
						</Typography>,
						...nav.items.map((item) => (
							<ListItemButton
								key={item.href}
								component="a"
								href={item.href}
								onClick={onClose}
								sx={{ borderRadius: theme.radius.sm }}
							>
								<ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
							</ListItemButton>
						)),
					])}
				</List>

				<Divider sx={{ my: "14px" }} />

				<Box sx={{ display: "grid", gap: "10px" }}>
					<Button
						component="a"
						href={`${baseUrl}/shop/rent/`}
						variant="outlined"
						startIcon={<ShoppingCartIcon size={24} aria-label={t("shop")} />}
						sx={{
							borderColor: theme.colors.border,
							color: theme.colors.textPrimary,
							fontWeight: 800,
							justifyContent: "flex-start",
							backgroundColor: theme.colors.surface,
							"&:hover": { backgroundColor: theme.colors.surface },
						}}
					>
						{t("shop")}
					</Button>

					<Button
						component="a"
						href={`${baseUrl}/contact/`}
						variant="outlined"
						startIcon={<MessageIcon size={18} aria-label={t("talkToExpert")} />}
						sx={{
							borderColor: theme.colors.border,
							color: theme.colors.textPrimary,
							fontWeight: 800,
							justifyContent: "flex-start",
							backgroundColor: theme.colors.surface,
							"&:hover": { backgroundColor: theme.colors.surface },
						}}
					>
						{t("talkToExpert")}
					</Button>

					<Button
						component="a"
						href={`${baseUrl}/app/`}
						variant="outlined"
						startIcon={<PersonIcon size={18} aria-label={t("customerArea")} />}
						sx={{
							borderColor: theme.colors.border,
							color: theme.colors.textPrimary,
							fontWeight: 800,
							justifyContent: "flex-start",
							backgroundColor: theme.colors.surface,
							"&:hover": { backgroundColor: theme.colors.surface },
						}}
					>
						{t("customerArea")}
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
}
