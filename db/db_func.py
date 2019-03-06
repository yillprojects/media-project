import sqlite3

conn = sqlite3.connect('media_project.sqlite')
cursor = conn.cursor()

def register_new_user(username, email, password):
    cursor.execute("""
                    SELECT *
                    FROM user_private
                    WHERE user_username = '""" + username + """'
                   """)
    same_usernames = cursor.fetchall()
    if len(same_usernames) != 0:
        return "SAME USERNAMES"

    cursor.execute("""
                    SELECT *
                    FROM user_private
                    WHERE user_email = '""" + email + """'
                   """)
    same_emails = cursor.fetchall()
    if len(same_emails) != 0:
        return "SAME EMAILS"

    
    cursor.execute("""
                    SELECT new_id
                    FROM service
                   """)
    user_id = cursor.fetchall()[0][0] + 1

    cursor.execute("""
                    UPDATE service
                    SET new_id = """ + str(user_id) + """
                   """)
    conn.commit()
        
    cursor.execute("""
                    insert into user_private
                    values (""" + str(user_id) + """, '""" + password + """', '""" + email + """', '""" + username + """')
                   """)
    conn.commit()

    return "OK"



def login(username, password):
    cursor.execute("""
                    SELECT *
                    FROM user_private
                    WHERE user_username = '""" + username + """'
                   """)
    user_username = cursor.fetchall()
    if len(user_username) == 0:
        return "WRONG USERNAME"

    cursor.execute("""
                    SELECT *
                    FROM user_private
                    WHERE user_password = '""" + password + """'
                   """)
    user_password = cursor.fetchall()
    if len(user_password) == 0:
        return "WRONG PASSWORD"

    return "OK"

