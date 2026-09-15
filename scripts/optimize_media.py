from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]

ASSETS = {
    "hero-system": ROOT / "public/media/hero-vk-workflow-vertical.png",
    "supergroups-art": ROOT / "public/media/supergroup-flow.png",
    "group-registry": ROOT / "public/media/group-registry.png",
    "autorepost-flow": ROOT / "public/media/autorepost-flow.png",
    "market-existing": ROOT / "public/media/smmbaza-ecosystem.png",
    "ai-rewrites": ROOT / "public/media/ai-rewrites.png",
    "post-variants": ROOT / "scr/Корректировка под группы.png",
    "report-builder": ROOT / "scr/Сбор скриншотов.png",
    "api-trust": ROOT / "scr/Сотрудники.png",
    "projects": ROOT / "scr/Проекты.png",
    "project-detail": ROOT / "scr/Проект.png",
    "supergroups-screen": ROOT / "scr/Супергруппы.png",
    "new-post": ROOT / "scr/Создать новый пост.png",
    "post-registry": ROOT / "scr/Реестр постов.png",
    "report-final": ROOT / "scr/Сбор скриншотов 6.png",
}


def output_directory(source: Path) -> Path:
    directory = source.parent / "optimized"
    directory.mkdir(exist_ok=True)
    return directory


def save_webp_versions(slug: str, source: Path) -> None:
    with Image.open(source) as original:
        image = original.convert("RGB")
        quality = 88 if source.parent.name == "scr" else 82
        widths = sorted({min(480, image.width), min(960, image.width), image.width})
        directory = output_directory(source)
        for width in widths:
            height = round(image.height * width / image.width)
            resized = image if width == image.width else image.resize((width, height), Image.Resampling.LANCZOS)
            suffix = "" if width == image.width else f"-{width}"
            resized.save(directory / f"{slug}{suffix}.webp", "WEBP", quality=quality, method=6)


def save_og_cover() -> None:
    source = ROOT / "public/media/smmbaza-og-cover.png"
    destination = output_directory(source) / "smmbaza-og-cover.jpg"
    with Image.open(source) as original:
        cover = ImageOps.fit(original.convert("RGB"), (1200, 630), method=Image.Resampling.LANCZOS)
        cover.save(destination, "JPEG", quality=88, optimize=True, progressive=True)


if __name__ == "__main__":
    for asset_slug, asset_source in ASSETS.items():
        save_webp_versions(asset_slug, asset_source)
    save_og_cover()
