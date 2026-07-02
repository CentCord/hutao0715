import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename, extname } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const imagesDir = join(root, 'public', 'images')
const avatarsDir = join(imagesDir, 'avatars')

if (!existsSync(avatarsDir)) {
  mkdirSync(avatarsDir, { recursive: true })
}

const avatarSources = [
  '1fcef3b283c9c1a358c701d203d2f428.jpg',
  '90188f812bd51fca5657519c679f0336.png',
  'a900949fad22bd8ea1aa3b604f713b3f_720.png',
  'e82b36ae263cbb7d586fd0bd1e0b94c2.png',
]

const qrSource = '6639ec1cb1e5a01bac318e61e264a5b5_720.jpg'

async function optimizeAvatar(filename) {
  const input = join(imagesDir, filename)
  const outputName = `${basename(filename, extname(filename))}.webp`
  const output = join(avatarsDir, outputName)

  await sharp(input)
    .resize(160, 160, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(output)

  console.log(`✓ avatar: ${filename} → images/avatars/${outputName}`)
}

async function optimizeQR() {
  const input = join(imagesDir, qrSource)
  const output = join(imagesDir, 'qr-320.webp')

  await sharp(input)
    .resize(320, 320, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(output)

  console.log(`✓ qr: ${qrSource} → images/qr-320.webp`)
}

async function main() {
  console.log('Optimizing images with sharp...\n')

  for (const filename of avatarSources) {
    await optimizeAvatar(filename)
  }

  await optimizeQR()

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
