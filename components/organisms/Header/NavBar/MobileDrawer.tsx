"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import Button from "../../../atoms/Button";
import theme from "../../../../styles/theme";
import { LanguegeIcon, ShoppingCartIcon } from "../../../atoms/Icon";
import type { NavItem } from "./navItems";

type MobileDrawerProps = {
	navItems: NavItem[];
	open: boolean;
	onClose: () => void;
};

export default function MobileDrawer({ navItems, open, onClose }: MobileDrawerProps) {
	const t = useTranslations("MobileMenu");
	const tActions = useTranslations("Actions");
	const tFooter = useTranslations("Footer");
	const locale = useLocale();
	const pathname = usePathname();
	const baseUrl = `https://escoramento.com/${locale}`;
	const [languageExpanded, setLanguageExpanded] = useState(false);

	const pathWithoutLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
	const linkForLocale = (nextLocale: "pt" | "en") => `/${nextLocale}${pathWithoutLocale || ""}`;
	const otherLocale: "pt" | "en" = locale === "en" ? "pt" : "en";
	const currentLanguageLabel = locale === "en" ? tActions("languageEn") : tActions("languagePt");
	const otherLanguageLabel = otherLocale === "en" ? tActions("languageEn") : tActions("languagePt");

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={() => {
				setLanguageExpanded(false);
				onClose();
			}}
			PaperProps={{ sx: { width: { xs: "100vw", sm: 360 } } }}
		>
			<Box sx={{ p: "18px" }} role="presentation">
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Box component={Link} href={`/${locale}`} onClick={onClose} sx={{ display: "flex" }}>
						<Box
							component="img"
							src="/logo.webp"
							alt="Escoramento"
							sx={{ maxHeight: 28, width: "auto", display: "block" }}
						/>
					</Box>
					<IconButton aria-label={t("close")} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box sx={{ mt: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Button
						variant="text"
						onClick={(event) => {
							event.preventDefault();
							setLanguageExpanded((prev) => !prev);
						}}
						startIcon={<LanguegeIcon size={18} aria-label={tActions("language")} />}
						endIcon={<ExpandMoreIcon fontSize="small" />}
						sx={{
							minWidth: 0,
							px: 0,
							py: "6px",
							color: theme.colors.textPrimary,
							fontWeight: 700,
							textTransform: "none",
							"& .MuiButton-endIcon": {
								marginLeft: "6px",
								transition: "transform 120ms ease",
								transform: languageExpanded ? "rotate(180deg)" : "rotate(0deg)",
							},
							"&:hover": {
								backgroundColor: "transparent",
								transform: "none",
								boxShadow: "none",
							},
						}}
					>
						{currentLanguageLabel}
					</Button>

					<Button
						component="a"
						href={`${baseUrl}/shop/rent/`}
						variant="outlined"
						startIcon={<ShoppingCartIcon size={18} aria-label={tActions("shop")} />}
						sx={{
							borderColor: theme.colors.border,
							color: theme.colors.textMuted,
							fontWeight: 400,
							px: "14px",
							py: "6px",
							borderRadius: "999px",
							textTransform: "uppercase",
							letterSpacing: "0.04em",
							backgroundColor: "transparent",
							"&:hover": {
								color: theme.colors.interactive,
								borderColor: theme.colors.border,
								transform: "none",
								boxShadow: "none",
								backgroundColor: "transparent",
							},
						}}
					>
						{tActions("shopLabel")}
					</Button>
				</Box>

				{languageExpanded ? (
					<Box sx={{ mt: "6px" }}>
						<ListItemButton
							component={Link}
							href={linkForLocale(otherLocale)}
							onClick={() => {
								setLanguageExpanded(false);
								onClose();
							}}
							sx={{ borderRadius: theme.radius.sm, px: 0, py: "6px" }}
						>
							<ListItemText
								primary={otherLanguageLabel}
								primaryTypographyProps={{ fontWeight: 600, fontSize: theme.typography.text.xxl }}
							/>
						</ListItemButton>
					</Box>
				) : null}

				<Divider sx={{ my: "14px" }} />

				<List sx={{ p: 0 }}>
					{navItems.flatMap((nav) => [
						<Typography
							key={`${nav.label}-title`}
							sx={{
								px: 0,
								pt: "10px",
								pb: "4px",
								fontWeight: 700,
								fontSize: theme.typography.text.base,
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
								sx={{
									borderRadius: theme.radius.sm,
									px: 0,
									py: "6px",
									"&:hover": { backgroundColor: "transparent" },
								}}
							>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										fontWeight: 400,
										fontSize: theme.typography.text.xxl,
										color: theme.colors.textMuted,
									}}
									sx={{ pl: "16px", m: 0 }}
								/>
							</ListItemButton>
						)),
					])}

					<Typography
						key="app-client-title"
						sx={{
							px: 0,
							pt: "14px",
							pb: "4px",
							fontWeight: 700,
							fontSize: theme.typography.text.base,
							color: theme.colors.textPrimary,
						}}
					>
						{tFooter("links.appClient")}
					</Typography>
					<ListItemButton
						key="app-client-budgets"
						component="a"
						href={`${baseUrl}/app/?tab=budgets`}
						onClick={onClose}
						sx={{
							borderRadius: theme.radius.sm,
							px: 0,
							py: "6px",
							"&:hover": { backgroundColor: "transparent" },
						}}
					>
						<ListItemText
							primary={tFooter("links.budgets")}
							primaryTypographyProps={{
								fontWeight: 400,
								fontSize: theme.typography.text.xxl,
								color: theme.colors.textMuted,
							}}
							sx={{ pl: "16px", m: 0 }}
						/>
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	);
}
