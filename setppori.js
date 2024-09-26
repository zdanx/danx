let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/.test(mime)) {
    let buffer = await q.download()
    await conn.updateProfilePicture(conn.user.jid, buffer).then(_ => m.reply('Success update profile picture'))
  } else if (args[0] && /https?:\/\//.test(args[0])) {
    await conn.updateProfilePicture(conn.user.jid, { url: args[0] }).then(_ => m.reply('Success update profile picture'))
  } else throw 'Where\'s the media?'
}

handler.alias = ['setpp', 'setppbot']
handler.command = /^setpp(bot)?$/i

handler.rowner = false

export default handler